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

@WebServlet(urlPatterns = "/bus")
public class BusServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            final ResultSet rst = CrudUtil.execute("SELECT * FROM bus");
            String json="[";
            while(rst.next()){
                json +="{\"busID\":\""+rst.getString(1)+"\",\"busNumber\":\""+rst.getString(2)+"\",\"busSeat\":"+rst.getInt(3)+"}," ;
            }
            json +="{\"busID\":\""+generateBusID()+"\"}]";
        resp.getWriter().write(json);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        try {
            resp.setContentType("application/json");
         boolean isSave=CrudUtil.execute("INSERT INTO bus VALUES(?,?,?) ",
                    req.getParameter("busID"),
                    req.getParameter("busNumber"),
                    req.getParameter("busSeat")
            );
            if(isSave){
                resp.getWriter().write("[{\"status\":true}]");
            }else{

                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) {
        try {
            resp.setContentType("application/json");
         boolean isSave=   CrudUtil.execute("UPDATE bus SET busNumber=?,busSeat=? WHERE busID=?",
                    req.getParameter("busNumber"),
                    req.getParameter("busSeat"),
                    req.getParameter("busID")
            );
         if(isSave){
             resp.getWriter().write("[{\"status\":true}]");
         }else{
             resp.getWriter().write("[{\"status\":false}]");
         }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)  {
        try {
            resp.setContentType("application/json");
             boolean isDelete= CrudUtil.execute("DELETE FROM bus WHERE busID=?", req.getParameter("busID"));
            if(isDelete){
                resp.getWriter().write("[{\"status\":true}]");
            }else{
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
    public String generateBusID() {
        try {
            final ResultSet rest = CrudUtil.execute("SELECT busID FROM bus ORDER BY busID DESC LIMIT 1");
            if(rest.next()){
                return GenerateNewID.generateID("B",rest.getString(1));
            }
                return GenerateNewID.generateID("B",null);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;

    }
}
