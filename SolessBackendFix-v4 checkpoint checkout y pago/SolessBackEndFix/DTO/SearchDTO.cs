namespace SolessBackEndFix.DTO
{
    public class Search
    {
        public string Query { get; set; } = "";
        public string SortField { get; set; } = "none";
        public string SortOrder { get; set; } = "none";
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 10;
    }
}
