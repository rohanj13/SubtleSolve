import axios from 'axios'
import getrequest from '../hooks/GetRequestImpl';

export const PuzzleService = {
  Getdailypuzzle,
  getGameHistory,
  getStats,
  createUser,
  createGameplay,
  updateGameplay,
  updateScore
}

function Getdailypuzzle() {
    var date = new Date();
    var today = date.toLocaleDateString();
    //const {data, loading, error} = getrequest("http://localhost:8081/api/dailypuzzle");
    
    return instance.get(`/dailypuzzle`, {
        params: {
            today: today
        }
      });
//   return {data, loading, error}
}

function getGameHistory(gameID, token) {
    return instance.get('/user/history', {
        params: {
            gameId: gameID
        },
        headers: { 'Authorization': bearerAuth(token) }
    });
}

function getStats(token) {
    return instance.get(`/user/stats`, {
        headers: { 'Authorization': bearerAuth(token) }
      })
}

function createUser(gameID, token) {
  return instance.post('/user/create', {
    params: {
      gameId: gameID
  },
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function createGameplay(gameID, firstGuess, token) {
    // console.log(token);
  return instance.post('/user/creategameplay', {gameID, firstGuess}, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function updateGameplay(gameID, guess, token) {
  return instance.post(`/user/updategameplay`, {gameID, guess}, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function updateScore(gameID, score, token) {
    var d1 = new Date();
    var today = d1.toLocaleDateString();
    var d2 = new Date();
    d2.setDate(d2.getDate() - 1);
    var yesterday = d2.toLocaleDateString();
  return instance.post(`/user/updatescore`, {yesterday, today, gameID, score}, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}


// -- Axios

const instance = axios.create({
  baseURL: "/api"
})

instance.interceptors.response.use(response => {
    return response;
  }, function (error) {
    if (error.response) {
      // Check if error.response exists before accessing its properties
      if (error.response.status === 404) {
        return { status: error.response.status };
      }
    } else {
      // Handle other errors (e.g., network errors)
      console.error('Network error or other issue:', error.message);
    }
    return Promise.reject(error);
  });

// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`
}