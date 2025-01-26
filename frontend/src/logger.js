import axios from "axios";

const logToBackend = async (level, message) => {
  try {
    await axios.post("http://127.0.0.1:8000/log/", { level, message });
  } catch (error) {
    console.error("Failed to send log to backend:", error);
  }
};

export default logToBackend;
