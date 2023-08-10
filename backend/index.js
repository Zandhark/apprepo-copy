const login = require("./login.js");
const newSession = require("./session.js");
const sendMail = require("./utils/sendMail.js");
const sendNotification = require("./utils/sendNotification.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const compression = require("compression");
const containerClient = require("./utils/azureBlob.js");
const bcrypt = require("bcrypt");

const app = express();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Puesto = require("./models/puestoModel.js");
const Empresa = require("./models/empresaModel.js");
const Session = require("./models/sessionModel.js");
const Notification = require("./models/notificationModel.js");
const User = require("./models/userModel.js");
const Aplication = require("./models/aplicationModel.js")

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(compression());

// Endpoints de puestos
app.get("/api/puestos", async (req, res) => {
  // retorna la lista de puestos
  try {
    const puestos = await Puesto.find({visibilidad: "publico"}).populate("empresa");
    if (puestos instanceof Error) {
      throw new Error(puestos.message);
    }
    res.json(puestos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/puestos/:id", async (req, res) => {
  // retorna un puesto dependiendo del id

  try {
    const puesto = await Puesto.findById(req.params.id).populate("empresa");
    if (puesto instanceof Error) {
      throw new Error(puesto.message);
    }
    res.status(200).json(puesto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/puestos/new", async (req, res) => {
  // agrega nuevo puesto

  try {
    const data = req.body;
    console.log(data)
    const puesto = new Puesto({
      nombre: data.nombre,
      descripcion: data.descripcion,
      rangoSalario: data.rangoSalario,
      requisitos: data.requisitos,
      atributos: data.atributos,
      visibilidad: data.visibilidad,
      empresa: data.empresa,
      createdBy: data.createdBy
    });
    const response = await puesto.save();
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/puestos/delete/:id", async (req, res) => {
  // borra un puesto
});

app.get("/api/puestos/empresa/:id", async (req, res) => {
  // retorna los puestos de una empresa
  try {
    const puestos = await Puesto.find({ empresa: req.params.id });
    if (puestos instanceof Error) {
      throw new Error(puestos.message);
    }
    res.status(200).json(puestos);
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e.message });
  }
});

// Endpoints de empresa
app.get("/api/empresas", async (req, res) => {
  // retorna lista de empresas

  try {
    const empresas = await Empresa.find({});
    if (empresas instanceof Error) {
      throw new Error(empresas.message);
    }
    res.status(200).json(empresas);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/empresas/:id", async (req, res) => {
  // retorna una empresa dependiendo del id
  try {
    const empresa = await Empresa.findById(req.params.id).populate("empleados");
    if (empresa instanceof Error) {
      throw new Error(empresa.message);
    }
    res.status(200).json(empresa);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/empresas/update/:id", async (req, res) => {
  // actualiza una empresa
  const data = req.body;
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, {
      nombre: data.nombre || Empresa.nombre,
      email: data.email || Empresa.email,
      password: data.password || Empresa.password,
      logo: data.logo || Empresa.logo,
      descripcion: data.descripcion || Empresa.descripcion,
      type: data.tipoUsuario || Empresa.type,
      shortDescription: data.shortDescription || Empresa.shortDescription,
    }, { new: true });
    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    console.log(empresa)
    res.status(200).json(empresa);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/empresas/new", async (req, res) => {
  //crea una nueva empresa
  try {
    const data = req.body;
    const logoBuffer = new Buffer.from(
      data.logo.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const empresa = new Empresa({
      nombre: data.nombre,
      email: data.email,
      password: hash,
      descripcion: data.descripcion,
      type: data.tipoUsuario,
    });

    const empresaResponse = await empresa.save();

    if (empresaResponse instanceof Error) {
      throw new Error(response.message);
    }

    const blockBlobClientLogo = containerClient.getBlockBlobClient(
      `${empresaResponse._id}-logo.jpg`
    );
    await blockBlobClientLogo.upload(logoBuffer, logoBuffer.length);
    const logoUrl = blockBlobClientLogo.url;
    const response = await Empresa.findByIdAndUpdate(empresaResponse._id, {
      logo: logoUrl,
    });

    if (response instanceof Error) {
      throw new Error(response.message);
    }
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/empresas/usuarios/:id", async (req, res) => {
  // agrega usuarios a la empresa
  const userId = req.body.userId;
  const empresaId = req.params.id;
  try {
    const responseEmpresa = await Empresa.findByIdAndUpdate(empresaId, {
      $push: { empleados: userId },
    }, {new: true});
    const responseUsuario = await User.findByIdAndUpdate(userId, { empresa: req.params.id });
    if (responseEmpresa instanceof Error) {
      
      throw new Error(responseEmpresa.message);
    }
    if (responseUsuario instanceof Error) {
      
      throw new Error(responseUsuario.message);
    }
    sendNotification(responseUsuario._id, "Empresa", `Ha sido agregado a ${responseEmpresa.nombre}`);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  
});

//Endpoints de usuarios
app.get("/api/usuarios", async (req, res) => {
  // retorna lista de usuarios
  try {
    const usuarios = await User.find({});
    if (usuarios instanceof Error) {
      throw new Error(usuarios.message);
    }
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/usuarios/:userId", async (req, res) => {
  // retorna un usuario dependiendo del id
  try {
    const user = await User.findById(req.params.userId);
    if (user instanceof Error) {
      throw new Error(user.message);
    }

    res.status(200).json(user);
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/update/:id", async (req, res) => {
  // actualiza un usuario
  try {
    const data = req.body;
    const usuario = await User.findByIdAndUpdate(req.params.id, {
      type: data.type || User.type,
      userDescription: data.userDescription || User.userDescription,
      title: data.title || User.title,
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/experiencia/:id", async (req, res) => {
  // actualiza la experiencia de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, {
      $push: { experience: req.body },
    });
    console.log(response);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/educacion/:id", async (req, res) => {
  // actualiza la educacion de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, {
      $push: { education: req.body },
    });
    console.log(response);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/skills/:id", async (req, res) => {
  // actualiza los skills de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, {
      skills: req.body,
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//Endpoints de aplicaciones
app.post("/api/aplicaciones/new", async (req, res) => {
  // crea una nueva aplicacion
  const data = req.body;
  try {
    const aplicacion = new Aplication({
      puesto: data.puesto,
      candidato: data.candidato,
      empresa: data.empresa,
      createdBy: data.createdBy,
      status: "Enviada",
    });
    const response = await aplicacion.save();
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    const puesto = await Puesto.findById(data.puesto);
    const candidato = await User.findById(data.candidato);
    console.log(puesto)
    console.log(candidato)
    sendNotification(data.empresa, "Aplicacion", `Ha recibido una nueva aplicacion para el puesto ${puesto.nombre}`);
    sendNotification(data.createdBy, "Aplicacion", `${candidato.name} ha aplicado al puesto ${puesto.nombre}`);
    sendMail(candidato.email, "Aplicacion", `Ha recibido una nueva aplicacion para el puesto ${puesto.nombre}`);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/aplicaciones/:userId", async (req, res) => {
  // retorna lista de aplicaciones de un usuario
  try {
    const aplicaciones = await Aplication.find({ candidato: req.params.userId });
    if (aplicaciones instanceof Error) {
      throw new Error(aplicaciones.message);
    }
    res.status(200).json(aplicaciones);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//Endpoints de notificaciones
app.get("/api/notifications/:userId", async (req, res) => {
  // retorna lista de notificaciones de un usuario
  try {
    const notification = await Notification.find({userId: req.params.userId});
    if (notification instanceof Error) {
      throw new Error(notification.message);
    }
    res.status(200).json(notification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/notifications/new", async (req, res) => {
  // crea una nueva notificacion
  try {
    const notification = new Notification(req.body);
    const response = await notification.save();
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/notifications/update/:notificationId", async (req, res) => {
  // actualiza una notificacion 
  try {
    const data = req.body;
    const notification = await Notification.findByIdAndUpdate(req.params.notificationId, {
      read: data.read,
    }, {new: true});

    if (!notification) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(notification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


//Endpoints de registro, login y sesiones
app.post("/api/login", async (req, res) => {
  // login de usuario
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const empresa = await Empresa.findOne({ email: email });
    if (!user && !empresa) {
      throw new Error("Usuario incorrecto");
    }
    if (empresa) {
      const passCompare = await bcrypt.compare(password, empresa.password);
      if (!passCompare) {
        throw new Error("Contraseña incorrecta");
      }
      const session = await newSession(empresa._id);
      const response = {
        login: empresa,
        session: session,
      };
      res.status(200).json(response);
      return;
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw new Error("Contraseña incorrecta");
    }
    console.log(user);
    const session = await newSession(user._id);
    const response = {
      login: user,
      session: session,
    };
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/registro", async (req, res) => {
  // registra un nuevo usuario final
  try {
    const usuario = req.body;
    const cvBuffer = Buffer.from(
      usuario.cv.replace(/^data:application\/\w+;base64,/, ""),
      "base64"
    );
    const fotoBuffer = Buffer.from(
      usuario.fotografia.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(usuario.passwordValue, salt);
    const user = new User({
      name: usuario.nombre,
      email: usuario.email,
      password: hashedPass,
      type: usuario.tipoUsuario,
      genero: usuario.genero,
      title: usuario.title,
      userDescription: "",
      about: usuario.userDescription,
      experience: usuario.expedrienciaLaboral,
      education: [],
      skills: [],
      languages: [],
    });

    const userResponse = await user.save();
    if (userResponse instanceof Error) {
      throw new Error(userResponse.message);
    }

    const blockBlobClientCV = containerClient.getBlockBlobClient(
      `${userResponse._id}-cv.pdf`
    );
    const blockBlobClientFoto = containerClient.getBlockBlobClient(
      `${userResponse._id}-profile.jpg`
    );
    const cvBlobOptions = {
      blobHTTPHeaders: {
        blobContentType: "application/pdf",
        blobContentDisposition: "inline"

      }
    } 

    const fotoBlobOptions = {
      blobHTTPHeaders: {
        blobContentType: "image/jpeg",
      }
    } 
    await blockBlobClientCV.upload(cvBuffer, cvBuffer.length, cvBlobOptions);
    await blockBlobClientFoto.upload(fotoBuffer, fotoBuffer.length, fotoBlobOptions);
    const cvUrl = blockBlobClientCV.url;
    const fotoUrl = blockBlobClientFoto.url;
    const response = await User.findByIdAndUpdate(
      userResponse._id,
      { curriculum: cvUrl, profileImg: fotoUrl },
      { new: true }
    );

    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/session", async (req, res) => {
  // crea una nueva sesion de usuario
  try {
    const { userId } = req.body;
    const session = await newSession(userId);
    if (session instanceof Error) {
      throw new Error(session.message);
    }
    res.status(200).json(session);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete/:id", async (req, res) => {
  //borra una sesion

  try {
    const response = await Session.deleteOne({ _id: req.params.id });
    console.log(response);
    res.status(200).json({ message: "Session deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete", async (req, res) => {
  // ignore, admin stuff
  // admin stuff to cleanup sessions
  const Session = require("./models/sessionModel.js");
  const response = await Session.deleteMany({});
  console.log(response);
  res.status(200).json({ message: "Sessions deleted" });
});

// Endpoint para enviar correos
app.post("/api/sendmail", async (req, res) => {
  // envia un mail
  try {
    const { email, subject, message } = req.body;
    const response = await sendMail(email, subject, message);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json({ message: "Mail sent" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
