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
    public class SalesController : Controller
    {
        private readonly CRUDContext _context;

        public SalesController(CRUDContext context)
        {
            _context = context;
        }
        public JsonResult GetSalesJson()
        {
            //2019-04-12
            var salesContext = _context.Sale.Select(p => new SalesData
            {
                Id=p.Id,
                CustomerId = p.Customer.Id,
                CustomerName = p.Customer.Name,
                ProductId = p.Product.Id,
                ProductName = p.Product.Name,
                StoreId = p.Store.Id,
                StoreName = p.Store.Name,
                DateSold = p.DateSold.ToString("yyyy-MM-dd")
            });
            
            return Json(salesContext);
        }

        public JsonResult GetDropdownJson()
        {
            var customer = _context.Customer.Select(c => new DropDown { Value = c.Id, Text = c.Name }).ToList();
            var product = _context.Product.Select(p => new DropDown { Value = p.Id, Text = p.Name }).ToList();
            var store = _context.Store.Select(p => new DropDown { Value = p.Id, Text = p.Name }).ToList();
            return Json(new { customer, product, store });
        }






        // GET: Sales
        public async Task<IActionResult> Index()
        {
            var cRUDContext = _context.Sale.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store);
            return View(await cRUDContext.ToListAsync());
        }

        // GET: Sales/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sale = await _context.Sale
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (sale == null)
            {
                return NotFound();
            }

            return View(sale);
        }

        // GET: Sales/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address");
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name");
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address");
            return View();
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult Create([FromBody] Sale Sale)
        

        {
          
            if (ModelState.IsValid)
            {
                _context.Add(Sale);
                _context.SaveChanges();
                // return RedirectToAction(nameof(Index));

            }
            return Json(Sale);

        }

        // GET: Sales/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sale = await _context.Sale.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", sale.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", sale.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", sale.StoreId);
            return View(sale);
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ProductId,StoreId,CustomerId,DateSold")] Sale sale)
        {
            if (id != sale.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sale);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SaleExists(sale.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", sale.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", sale.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", sale.StoreId);
            return View(sale);
        }
        [HttpPut]
        public JsonResult EditSale(int id,[FromBody]Sale Sale)
        {
            if (!SaleExists(Sale.Id))
            {
                return Json(" Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    //_context.Update(customer.Name);
                    _context.Update(Sale);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SaleExists(Sale.Id))
                    {
                        return Json("not exist");
                    }
                    else
                    {
                        throw;
                    }
                }
                // return RedirectToAction(nameof(Index));
            }
            return Json(Sale);
        }

        // GET: Sales/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sale = await _context.Sale
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (sale == null)
            {
                return NotFound();
            }

            return View(sale);
        }

        [HttpPost]
        public JsonResult DeleteSale(int id,[FromBody]Sale Sale)
        {
            if (!SaleExists(Sale.Id))
            {
                return Json(" Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    //_context.Update(customer.Name);
                    _context.Sale.Remove(Sale);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SaleExists(Sale.Id))
                    {
                        return Json("not exist");
                    }
                    else
                    {
                        throw;
                    }
                }
                // return RedirectToAction(nameof(Index));
            }
            return Json(Sale);
        }

        private bool SaleExists(int id)
        {
            return _context.Sale.Any(e => e.Id == id);
        }
    }
}
