package cu.uci.cegel.quejas_anpp.kernel.config;

import cu.uci.cegel.quejas_anpp.kernel.IPAddressValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilterApp implements Filter {

    @Autowired
    private IPAddressValidator ipAddressValidator;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        final HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type");
        response.setHeader("Access-Control-Expose-Headers", "X-sigquoApp-badrequest, X-sigquoApp-success, X-sigquoApp-info, X-sigquoApp-error");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");

        if (ipAddressValidator.validate(((HttpServletRequest) req).getHeader("host").split(":")[0])) {
            response.setHeader("Access-Control-Allow-Origin", (((HttpServletRequest) req).getHeader("origin")));
        }
        if ("OPTIONS".equalsIgnoreCase(((HttpServletRequest) req).getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            if (((HttpServletRequest) req).getRequestURI().contains("upload")) {
                response.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, multipart/form-data");
            }
            chain.doFilter(req, res);
        }
    }

    @Override
    public void destroy() {
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }
}