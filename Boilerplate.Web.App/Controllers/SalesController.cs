using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        private readonly CRUDContext _context;

        public SalesController(CRUDContext context)
        {
            _context = context;
        }
        //index
        public JsonResult GetSalesJson()
        {
            //2019-04-12
            var salesContext = _context.Sale.Select(p => new SalesData
            {
                CustomerId = p.Customer.Id,
                CustomerName = p.Customer.Name,
                Id = p.Id,
                ProductId = p.Product.Id,
                ProductName = p.Product.Name,
                StoreId = p.Store.Id,
                StoreName = p.Store.Name,
                DateSold = p.DateSold.ToString("yyyy-MM-dd")
            });
            return Json(salesContext);
           
        }

        //dropdown
        public JsonResult GetDropdownJson()
        {
            var customer = _context.Customer.Select(c => new DropDown { Value = c.Id, Text = c.Name }).ToList();
            var product = _context.Product.Select(p => new DropDown { Value = p.Id, Text = p.Name }).ToList();
            var store = _context.Store.Select(p => new DropDown { Value = p.Id, Text = p.Name }).ToList();
            return Json(new { customer, product, store });
        }

        //create
        [HttpPost]
        public JsonResult Create([FromBody] Sale Sale)


        {
            if (ModelState.IsValid)
            {
                _context.Add(Sale);
                _context.SaveChanges();

            }
            return Json(Sale);

        }

        //edit
        [HttpPut]
        public JsonResult EditSale([FromBody]Sale Sale)
        {
            var s = _context.Sale.Where(x => x.Id == Sale.Id).SingleOrDefault();



            s.CustomerId = Sale.CustomerId;
            s.ProductId = Sale.ProductId;
            s.StoreId = Sale.StoreId;
            s.DateSold = Sale.DateSold;

            _context.SaveChanges();
            return Json(Sale);
        }

        //delete
        [HttpPost]
        public JsonResult DeleteSale([FromBody]Sale Sale)
        {
            
            var sales = _context.Sale.Where(x => x.Id ==Sale.Id).SingleOrDefault();
            if (sales != null)
            {
                _context.Sale.Remove(sales);
                _context.SaveChanges();
            }
            return Json(Sale);
        }
    }
}
