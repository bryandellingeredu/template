using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.GraphHelper
{

    public interface IGraphHelperService
    {
        Task SendEmailAsync(string title, string body, string[] recipients);
    }
}
