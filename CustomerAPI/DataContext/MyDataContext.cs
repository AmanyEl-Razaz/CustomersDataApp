using CustomerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataContext
{
        public class MyDataContext : DbContext
        {
            public MyDataContext(DbContextOptions<MyDataContext> options) : base(options)
            {
            }
            public DbSet<Customer> Customers { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Customer>().ToTable("Customers");
            }
        }
    }
