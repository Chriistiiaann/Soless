namespace SolessBackEndFix.DTO;

public class CartDTO
{
    public long UserId { get; set; }
    public List<CartProductDTO> CartProducts { get; set; }
}