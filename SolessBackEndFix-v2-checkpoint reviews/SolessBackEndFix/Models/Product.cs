﻿using System.ComponentModel.DataAnnotations;

namespace SolessBackEndFix.Models
{
    public class Product
    {
        [Key]
        public long Id { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public double? Original_Price{ get; set; }
        public double? Discount_Price{ get; set; }
        public int? Stock{ get; set; }
        public string? Img_Name { get; set; }
        public string? Description { get; set; }
        public string? Composition {  get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}