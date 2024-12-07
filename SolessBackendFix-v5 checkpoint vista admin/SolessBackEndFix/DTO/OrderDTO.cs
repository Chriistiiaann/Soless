namespace SolessBackEndFix.DTO
{
    public class OrderDTO
    {
        public long UserId { get; set; }
        public DateTime OrderDate { get; set; }

        //Cambiar de OrdelItem a OrderItemCompleto
        public List<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
    }
}
