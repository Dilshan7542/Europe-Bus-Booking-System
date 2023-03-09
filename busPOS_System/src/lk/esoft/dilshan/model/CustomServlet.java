package lk.esoft.dilshan.model;

import lk.esoft.dilshan.util.CrudUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/custom")
public class CustomServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

         boolean cusEmail = false;
         boolean cusPwd = false;
         boolean userEmail = false;
         boolean userPwd = false;
        resp.setContentType("application/json");
        String json = "[";
        try {

         ResultSet rstCus=  CrudUtil.execute("SELECT * FROM customer WHERE email=? AND pwd=?",
                 req.getParameter("email").trim(),
                 req.getParameter("pwd").trim()
         );
         if(rstCus.next()){
             cusEmail=true;
             cusPwd=true;
                 json += "{\"custID\":\"" + rstCus.getString(1) +
                         "\",\"nic\":\"" + rstCus.getString(2) +
                         "\",\"name\":\"" + rstCus.getString(3) +
                         "\",\"surname\":\"" + rstCus.getString(4) +
                         "\",\"email\":\"" + rstCus.getString(5) +
                         "\",\"pwd\":\"" + rstCus.getString(6) +
                         "\",\"gender\":\"" + rstCus.getString(7) +
                         "\",\"tel\":\"" + rstCus.getString(8) +
                         "\",\"dob\":\"" + rstCus.getString(9) + "\"},";
         }
         ResultSet rstUser=  CrudUtil.execute("SELECT * FROM users WHERE email=? AND pwd=?",
                 req.getParameter("email").trim(),
                 req.getParameter("pwd").trim()
                 );
            if(rstUser.next()){
                userEmail=true;
                userPwd=true;
                json += "{\"userID\":\"" + rstUser.getString(1) +
                        "\",\"ftName\":\"" + rstUser.getString(2) +
                        "\",\"ltName\":\"" + rstUser.getString(3) +
                        "\",\"email\":\"" + rstUser.getString(4) +
                        "\",\"pwd\":\"" + rstUser.getString(5) + "\"},";

            }
            if(!cusEmail && !userEmail){
                json +="{\"empty\":\"none\"},";
            }
        json +="{\"isCusEmail\":"+cusEmail+",\"isCusPwd\":"+cusPwd+"},{\"isUserEmail\":"+userEmail+",\"isUserPwd\":"+userPwd+"}]";
                    resp.getWriter().write(json);

        } catch (SQLException e) {
            e.printStackTrace();
        }




    }

}
