package lk.esoft.dilshan.model;

import lk.esoft.dilshan.util.CrudUtil;
import lk.esoft.dilshan.util.GenerateNewID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/route")
public class RouteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String json="[";
        try {
           ResultSet rst= CrudUtil.execute("SELECT * FROM route");
               while(rst.next()){
                   json +="{\"routeID\":\""+
                           rst.getString(1)+
                           "\",\"city\":\""+rst.getString(2)+
                           "\",\"cost\":"+rst.getDouble(3)+
                           ",\"departureDate\":\""+rst.getString(4)+
                           "\",\"departureTime\":\""+rst.getString(5)+
                           "\",\"busID\":\""+rst.getString(6)+"\"}," ;
               }
            json +="{\"routeID\":\""+ generateRouteID()+"\"}]";

                resp.getWriter().write(json);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String generateRouteID() {
        try {
            final ResultSet rest = CrudUtil.execute("SELECT routeID FROM route ORDER BY routeID DESC LIMIT 1");
            if(rest.next()){
                return GenerateNewID.generateID("RT",rest.getString(1));
            }
            return GenerateNewID.generateID("RT",null);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isSave=  CrudUtil.execute("INSERT INTO route VALUES (?,?,?,?,?,?)",
                    generateRouteID(),
                    req.getParameter("city"),
                    req.getParameter("cost"),
                    req.getParameter("departureDate"),
                    req.getParameter("departureTime"),
                    req.getParameter("busID")
            );
            if(isSave){
                resp.getWriter().write("[{\"status\":true}]");
            }else{
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isUpdate=  CrudUtil.execute("UPDATE route SET via_Rode=?,cost=?,date=?,time=?,busID=? WHERE routeID=?",
                    req.getParameter("city"),
                    req.getParameter("cost"),
                    req.getParameter("departureDate"),
                    req.getParameter("departureTime"),
                    req.getParameter("busID"),
                    req.getParameter("routeID")
            );
            if(isUpdate){
                resp.getWriter().write("[{\"status\":true}]");
            }else{
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        try {
            resp.setContentType("application/json");
            boolean isDelete= CrudUtil.execute("DELETE FROM route WHERE routeID=?", req.getParameter("routeID"));
            if(isDelete){
                resp.getWriter().write("[{\"status\":true}]");
            }else{
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
