using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;
using PagedList;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CRUDContext _context;

        public CustomersController(CRUDContext context)
        {
            _context = context;
        }
        public JsonResult GetJsonResult()
        {
            var paged = _context.Customer.ToList();
            return Json(paged);
           
        }
       
      //get
        [HttpPost]
        public JsonResult Create([FromBody] Customer Customer)


        {
          
            
                _context.Add(Customer);
                _context.SaveChanges();
            // return RedirectToAction(nameof(Index));


            return Json(Customer);
           
               

        }



        [HttpPut]
        public JsonResult EditCustomer([FromBody]Customer Customer)
        {

            var cust = _context.Customer.Where(x => x.Id == Customer.Id).SingleOrDefault();



            cust.Name = Customer.Name;
            cust.Address = Customer.Address;
            _context.SaveChanges();
            return Json(Customer);
        }
           
       

          

        [HttpPost]

        public JsonResult DeleteCustomer([FromBody]Customer Customer)
        {
            var customer = _context.Customer.Find(Customer.Id);
            _context.Entry(customer).Collection(c => c.Sale).Load();
            if (customer.Sale.Count > 0)
            {
                foreach (var sales in customer.Sale)
                {
                    _context.Sale.Remove(sales);
                }
            }
            _context.Customer.Remove(customer);
            _context.SaveChanges();

            return Json(Customer);
            
        }
      
       
    }
}
