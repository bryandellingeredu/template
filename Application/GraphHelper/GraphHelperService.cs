

using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Extensions.Hosting;
using Azure.Identity;
using Microsoft.Graph.Models;


namespace Application.GraphHelper
{
    

    public class GraphHelperService : IGraphHelperService
    {
        private readonly IHostEnvironment _hostEnvironment;
        private readonly IConfiguration _config;
        private readonly GraphServiceClient _appClient;
        private readonly string serviceAccount;

        public GraphHelperService(IConfiguration config, IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _config = config;
            var tenantId = _config["GraphHelper:tenantId"];
            var clientId = _config["GraphHelper:clientId"];
            var clientSecret = _config["GraphHelper:clientSecret"];
            serviceAccount = _config["GraphHelper:serviceAccount"];
            if (string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            {
                throw new InvalidOperationException("Graph configuration is missing.");
            }

            var credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
            _appClient = new GraphServiceClient(credential, new[] { "https://graph.microsoft.com/.default" });
        }

        public async Task SendEmailAsync(string title, string body, string[] recipients)
        {
            var toRecipients = recipients.Select(email => new Recipient
            {
                EmailAddress = new EmailAddress { Address = email }
            }).ToList();

            var message = new Message
            {
                Subject = title,
                Body = new ItemBody
                {
                    ContentType = BodyType.Html,
                    Content = body
                },
                ToRecipients = toRecipients
            };

            var mailbody = new Microsoft.Graph.Users.Item.SendMail.SendMailPostRequestBody
            {
                Message = message,
                SaveToSentItems = false
            };

            try
            {
                // Send the email
                await _appClient.Users[serviceAccount]
                    .SendMail
                    .PostAsync(mailbody);
            }
            catch (Exception ex)
            {
                // Handle the exception as needed
                throw;
            }


        }
    }
}
