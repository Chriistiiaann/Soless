using System;
using System.Collections.Generic;

namespace PruebaSolessChristian.Models.Database;

public partial class User
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; } = "none";

    public string? Address { get; set; }
}
