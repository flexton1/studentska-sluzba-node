
// @ts-ignore
import {checkToken, login, logout, register} from "../controllers/userController.ts";
import {validateToken} from "../../JWT";
// @ts-ignore
import {createStudent, deleteStudent, getAllStudents, updateStudent} from "../controllers/studentController.ts";


const routes = (app) => {


    app.route('/check-token')
        .get(validateToken, checkToken)

    app.route('/register')
        .post(register);

    app.route('/login')
        .post(login);

    app.route('/logout')
        .get(validateToken, logout)

    app.route('/create-student')
        .post(validateToken, createStudent);

    app.route('/get-all-students')
        .post(validateToken, getAllStudents);
      
      app.route('/delete-student')
          .post(validateToken, deleteStudent);

      app.route('/update-student')
          .post(validateToken, updateStudent);
      



}



export default routes;
