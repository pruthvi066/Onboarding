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
    public class Sales1Controller : Controller
    {
        private readonly CRUDContext _context;

        public Sales1Controller(CRUDContext context)
        {
            _context = context;
        }

        // GET: Sales1
        public async Task<IActionResult> Index()
        {
            var cRUDContext = _context.Sale.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store);
            return View(await cRUDContext.ToListAsync());
        }

        // GET: Sales1/Details/5
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

        // GET: Sales1/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address");
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name");
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address");
            return View();
        }

        // POST: Sales1/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ProductId,StoreId,CustomerId,DateSold")] Sale sale)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sale);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", sale.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", sale.ProductId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", sale.StoreId);
            return View(sale);
        }

        // GET: Sales1/Edit/5
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

        // POST: Sales1/Edit/5
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

        // GET: Sales1/Delete/5
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

        // POST: Sales1/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sale = await _context.Sale.FindAsync(id);
            _context.Sale.Remove(sale);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SaleExists(int id)
        {
            return _context.Sale.Any(e => e.Id == id);
        }
    }
}
