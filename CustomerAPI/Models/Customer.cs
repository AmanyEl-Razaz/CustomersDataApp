using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string customerName { get; set; }
        public string customerClass { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string comment { get; set; }
    }
}
