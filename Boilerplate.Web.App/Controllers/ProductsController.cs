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
    public class ProductsController : Controller
    {
        private readonly CRUDContext _context;

        public ProductsController(CRUDContext context)
        {
            _context = context;
        }

        //index
        public JsonResult GetProduct()
        {
            var paged = _context.Product.ToList();
           
            return Json(paged);
        }

     
       //get
        [HttpPost]
        public JsonResult Create([FromBody] Product Product)


        {
            if (ModelState.IsValid)
            {
                _context.Add(Product);
                _context.SaveChanges();
               

            }
            return Json(Product);

        }

        //edit
        [HttpPut]
        public JsonResult EditProduct([FromBody]Product Product)
        {
            var p = _context.Product.Where(x => x.Id == Product.Id).SingleOrDefault();



            p.Name = Product.Name;
            p.Price = Product.Price;
            _context.SaveChanges();
            return Json(Product);
        }

       

      
         

      
            

      

       //delete
        [HttpPost]

        public JsonResult DeleteProduct([FromBody]Product Product)
        {
            var product = _context.Product.Find(Product.Id);
            _context.Entry(product).Collection(c => c.Sale).Load();
            if (product.Sale.Count > 0)
            {
                foreach (var sales in product.Sale)
                {
                    _context.Sale.Remove(sales);
                }
            }
            _context.Product.Remove(product);
            _context.SaveChanges();

            return Json("Product Removed Successfully");

        }


    }
}
