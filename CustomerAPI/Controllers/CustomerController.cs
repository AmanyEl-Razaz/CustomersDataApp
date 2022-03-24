using CustomerAPI.DataContext;
using CustomerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly MyDataContext _context;

        public CustomerController(MyDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<IEnumerable<Customer>>> Get()
        {
            return await _context.Customers.ToListAsync();
        }
        [HttpGet]
        [Route("Details")]
        public async Task<ActionResult<Customer>> Get(int id)
        {
            var data = await _context.Customers.FindAsync(id);
            return data;
        }

        [HttpPost]
        [Route("CreateCustomer")]
        public async Task<ActionResult<Customer>> POST(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = customer.id }, customer);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpPost]
        [Route("DeleteCustomer")]
        public async Task<ActionResult<IEnumerable<Customer>>> Delete(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return await _context.Customers.ToListAsync();
        }

        [HttpPost]
        [Route("UpdateCustomer")]
        public async Task<ActionResult<IEnumerable<Customer>>> Update(int id, Customer customer)
        {
            if (id != customer.id)
            {
                return BadRequest();
            }

            var customerData = await _context.Customers.FindAsync(id);
            if (customerData == null)
            {
                return NotFound();
            }

            customerData.customerName = customer.customerName;
            customerData.customerClass = customer.customerClass;
            customerData.phone = customer.phone;
            customerData.email = customer.email;
            customerData.comment = customer.comment;


            await _context.SaveChangesAsync();
            return await _context.Customers.ToListAsync();

        }
    }
}
