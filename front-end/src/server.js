import { createServer } from "miragejs";

const tournament = [
  {
    mode: "offline",
    users: ["hamza", "sma3in", "yahya", "lhosin"],
  },
  { mode: "online", users: ["hamza", "sma3in", "yahya", "lhosin"]},
];
createServer({
  routes() {
    this.namespace = "api";
    this.get("/movies", () => {
      return {
        movies: [
          { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 },
        ],
      };
    });
    this.get("/challenge", () => {
      return {
        inLobby: [
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
          { name: "Hyounsi", image: "/hyounsi.png" },
          { name: "Ykhourba", image: "/ykhourba.jpeg" },
        ],
        inGame: [
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
          { name: "Hyounsi", image: "/hyounsi.png", gameName: "ping Pong" },
          { name: "Ykhourba", image: "/ykhourba.jpeg", gameName: "Tic Tac Toa" },
        ],
      };
    });
    this.get('/tournament',()=>{
      return tournament;
    })
    this.post("/tournament", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      tournament.push(attrs);
      console.log(tournament)
      return tournament;
    });
  },
});