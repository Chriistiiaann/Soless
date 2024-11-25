namespace SolessBackEndFix.DTO
{
    public class ReviewDTO
    {
        public long ProductId { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; } 
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
