/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.g2.giphy;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import org.json.JSONObject;


/**
 *
 * @author ongxinying
 */
@WebServlet(urlPatterns = "/addNew")
public class ImageNewServlet extends HttpServlet {
    
    @Resource(lookup="jdbc/giphy")
    private DataSource connectionPool;
    
    @Override
    protected void doPost (HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
       
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        BufferedReader reader = req.getReader();
        while ((line = reader.readLine()) != null)
        stringBuilder.append(line);
 
        JSONObject jsonObject;
        jsonObject = new JSONObject(stringBuilder.toString());
        
        String email = jsonObject.getString("email");  
	String imageId = jsonObject.getString("imageId");
        
        try (Connection connection = connectionPool.getConnection()){
            PreparedStatement ps = connection.prepareStatement
            ("insert into image (imageId, email) values (?, ?)");
            ps.setString(1, imageId);
            ps.setString(2, email);
            ps.executeUpdate();
            
        } catch (SQLException ex){
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }  
}
