﻿using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class Sale
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }

        internal object ToList()
        {
            throw new NotImplementedException();
        }
    }
}
