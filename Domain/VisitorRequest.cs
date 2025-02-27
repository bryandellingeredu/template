using System;

namespace Domain;

public class VisitorRequest
{
  public Guid Id { get; set; }
  public required string Title { get; set; } 
  public  string?  Description { get; set; }   
}
