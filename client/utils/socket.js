// src/utils/socket.js
import io from "socket.io-client";
import { BASE_URL } from "../constants/constant";

const socket = io(BASE_URL);

export default socket;
