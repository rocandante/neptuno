apiRoutes.post('/delete/:id',requireAdmin, function (req, res) {
     //do the rest 
}; 

/**
 * @description
 * @author Juan Cardona
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} 
 */
function requireAdmin(req, res, next) { 
    var currentUserRole=".."; //get current user role 
    
    if('admin' == currentUserRole ) { 
        next(); 
    } else { 
        next(new Error("Permission denied.")); 
        return; 
    } 
};

function canAccess(req, res, next) { 
    checkAuthorization(req, function (err, authorized) { 
        if (err || !authorized) { 
            res.send({message: 'Unauthorized', status: 401}); 
        } 
        
        next(); 
    }); 
    
    function checkAuthorization(req, callback) { 
        // jwt decode and actual authentication admin/superuser matching goes here.. 
    } 
} 

router.use(canAccess); 



import { randomBytes } from 'crypto'; 
import { sign, verify } from 'jsonwebtoken'; 

randomBytes(256, function(ex, buf) { 
    
    if (ex) throw ex; 
    
    var token = sign({foo: 'bar'}, buf); 
    
    var decoded = verify(token, buf); 
});