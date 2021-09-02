import Api from "./api.js";

export class Auth {
  #token = null;

  async login(email, password) {
    let loginData = {
      email,
      password 
    };
  
    const responce = await Api.post("/auth/login")
      .json(loginData)
      .execute();
  
    if (this.#isAuthSuccessful(responce)) {     
      const errMessage = await this.#extractErrData(responce)
      const err = new Error("Login error");
      err.data = errMessage;
  
      throw err;
    } else {
      this.#token = await this.#extractAuthToken(responce);      
    }
  }

  get token() {
    return this.#token;
  }

  async #extractAuthToken(responce) {
    return await responce.text();
  } 

  async #extractErrData(responce) {
    return await responce.text();
  }

  #isAuthSuccessful(responce) {
    return responce.status >= 400;
  }
}

export default new Auth();