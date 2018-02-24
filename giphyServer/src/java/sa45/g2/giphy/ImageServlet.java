/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.g2.giphy;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author ongxinying
 */
@WebServlet(urlPatterns = "/images")
public class ImageServlet extends HttpServlet {
    
    @Resource(lookup="jdbc/giphy")
    private DataSource connectionPool;
    
    @Override
    protected void doGet (HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        JsonArrayBuilder imageBuilder = Json.createArrayBuilder();

        try (Connection connection = connectionPool.getConnection()){
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("select * from IMAGE");
            
            while (rs.next())
            {
                JsonObject imageObject = Json.createObjectBuilder()
                        .add("imageId", rs.getString("imageId"))
                        .add("email", rs.getString("email"))
                        .build();
                imageBuilder.add(imageObject);
            }
            rs.close();
            
        } catch (SQLException ex){
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        
        try (PrintWriter pw = resp.getWriter()){
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType(MediaType.APPLICATION_JSON);
            pw.println(imageBuilder.build().toString());
        }
    }  
}
