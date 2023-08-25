import express from "express";
import http from "http";
import { Server } from "socket.io";
import cohere from "cohere-ai";
import dotenv from "dotenv";

// Se configura dotenv para cargar las variables de entorno
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Configura la API de Cohere con la APIKEY
try {
  cohere.init(process.env.COHERE_APIKEY);
} catch (error) {
  console.error("Error initializing Cohere", error);
  process.exit(1);
}

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log(`User connected: ${socket.id}`);
  console.log(`Username: ${username}`);

  socket.on("message", (data) => {
    // Emitir el mensaje de los usuarios a todos los demás clientes conectados
    try {
      socket.broadcast.emit("message-received", {
        message: data,
        from: {
          id: socket.id,
          username,
        },
      });
    } catch (error) {
      console.error("Error handling user message", error);
    }

    //Pasar el mensaje del usuario como prompt del modelo
    const prompt = `Respond in a manner suitable for a school-aged child, between 6 and 12 years old: ${data}`;
    (async () => {
      const response = await cohere.generate({
        prompt: prompt,
        max_tokens: 50,
      });

      //Obtener solo el texto de la respuesta de Cohere
      const cohereResponse = response.body.generations[0].text;

      // Emitir la respuesta de Cohere a todos los demás clientes conectados
      try {
        io.emit("cohere-response", {
          message: cohereResponse,
          from: {
            id: "Teacher-Cohere",
            username: "Teacher-Cohere", // Nombre elegido para el bot
          },
        });
      } catch {
        console.error("Error handling Cohere message", error);
      }
    })();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000 🐶");
});
