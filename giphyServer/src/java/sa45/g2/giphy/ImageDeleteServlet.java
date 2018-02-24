/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sa45.g2.giphy;

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

/**
 *
 * @author ongxinying
 */
@WebServlet(urlPatterns = "/delete/*")
public class ImageDeleteServlet extends HttpServlet {
    
    @Resource(lookup="jdbc/giphy")
    private DataSource connectionPool;
    
    @Override
    protected void doDelete (HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        String email = req.getParameter("email");
        String imageId = req.getParameter("imageId");
        
        try (Connection connection = connectionPool.getConnection()){
            PreparedStatement ps = connection.prepareStatement
            ("delete from image where imageId = ? and email = ?");
            ps.setString(1, imageId);
            ps.setString(2, email);
            ps.executeUpdate();
            
        } catch (SQLException ex){
            log(ex.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }                 
    }  
}
