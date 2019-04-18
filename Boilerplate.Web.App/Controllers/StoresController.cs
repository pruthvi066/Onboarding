using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using PagedList;
using System.Linq;

namespace Boilerplate.Web.App.Controllers
{
    public class StoresController : Controller
    {
        private readonly CRUDContext _context;

        public StoresController(CRUDContext context)
        {
            _context = context;
        }
        //index
        public JsonResult GetStore()
        {
            var paged = _context.Store.ToList();
           
            return Json(paged);
        }

     
       


       //create
        [HttpPost]
        public JsonResult Create([FromBody] Store Store)


        {
            if (ModelState.IsValid)
            {
                _context.Add(Store);
                _context.SaveChanges();
                // return RedirectToAction(nameof(Index));

            }
            return Json(Store);
           
        }
        //edit
        [HttpPut]
        public JsonResult EditStore([FromBody]Store Store)
        {
            var store = _context.Store.Where(x => x.Id == Store.Id).SingleOrDefault();



            store.Name = Store.Name;
            store.Address = store.Address;
            _context.SaveChanges();
            return Json(Store);
        }
       

      

       
       //delete
        [HttpPost]

        public JsonResult DeleteStore(int id, [FromBody]Store Store)
        {
            var store = _context.Store.Find(Store.Id);
            _context.Entry(store).Collection(c => c.Sale).Load();
            if (store.Sale.Count > 0)
            {
                foreach (var sales in store.Sale)
                {
                    _context.Sale.Remove(sales);
                }
            }
            _context.Store.Remove(store);
            _context.SaveChanges();

            return Json("Store Removed Successfully");
        }

       
    }
}
