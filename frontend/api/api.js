import api from "./axios";

const loginUser = async (data) => {
  return api.post("/auth/student-login", data);
};

export default loginUser;
