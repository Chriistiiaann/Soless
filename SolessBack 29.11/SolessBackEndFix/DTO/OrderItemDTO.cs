namespace SolessBackEndFix.DTO
{
    //public class OrderItemDTO
    //{
    //    public long ProductId { get; set; }
    //    public int Quantity { get; set; }
    //    public decimal Price { get; set; }
    //}

    public class OrderItemDTO
    {
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? Img_Name { get; set; }
        public string? Model { get; set; }
    }
}
