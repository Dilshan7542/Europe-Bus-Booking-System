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

@WebServlet(urlPatterns = "/booking")
public class BookingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String json = "[";
        try {
            ResultSet rst = CrudUtil.execute("SELECT b.bookingID,b.cusID,c.name,c.tel,r.busID,r.via_Rode,b.seat,r.cost,r.date,r.time,b.bookingDate,b.bookingTime FROM booking as b INNER JOIN customer c on b.cusID = c.cusID INNER JOIN route r on b.routeID = r.routeID");
            while (rst.next()) {
                json += "{\"bookingID\":\"" + rst.getString(1) +
                        "\",\"custID\":\"" +rst.getString(2)+
                        "\",\"name\":\"" +rst.getString(3)+
                        "\",\"tel\":\"" +rst.getString(4)+
                        "\",\"busID\":\"" + rst.getString(5) +
                        "\",\"city\":\"" + rst.getString(6) +
                        "\",\"busSeat\":" + rst.getInt(7) +
                        ",\"cost\":" + rst.getDouble(8) +
                        ",\"departureDate\":\"" + rst.getString(9) +
                        "\",\"departureTime\":\"" + rst.getString(10) +
                        "\",\"bookingDate\":\"" + rst.getString(11) +
                        "\",\"bookingTime\":\"" + rst.getString(12) +
                        "\"},";
            }
            json += "{\"bookingID\":\"" + generateBookingID() + "\"}]";
            resp.getWriter().write(json);

        } catch (SQLException | NumberFormatException e) {
            e.printStackTrace();
        }
    }

    private String generateBookingID() {
        try {
            final ResultSet rest = CrudUtil.execute("SELECT bookingID FROM booking ORDER BY bookingID DESC LIMIT 1");
            if (rest.next()) {
                return GenerateNewID.generateID("BK", rest.getString(1));
            }
            return GenerateNewID.generateID("BK", null);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isSave = CrudUtil.execute("INSERT INTO booking VALUES (?,?,?,?,?,?)",
                    generateBookingID(),
                    req.getParameter("busSeat"),
                    req.getParameter("bookingDate"),
                    req.getParameter("bookingTime"),
                    req.getParameter("routeID"),
                    req.getParameter("custID")
            );
            if (isSave) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
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
            boolean isSave = CrudUtil.execute("UPDATE booking SET seat=?,bookingDate=?,bookingTime=?,routeID=?,cusID=? WHERE bookingID=?",
                    generateBookingID(),
                    req.getParameter("busSeat"),
                    req.getParameter("bookingDate"),
                    req.getParameter("bookingTime"),
                    req.getParameter("routeID"),
                    req.getParameter("custID")
            );
            if (isSave) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isDelete = CrudUtil.execute("DELETE FROM booking WHERE bookingID=?", req.getParameter("bookingID"));
            if (isDelete) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
