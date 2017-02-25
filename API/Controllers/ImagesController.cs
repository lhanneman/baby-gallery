using System.Collections.Generic;
using System.Web.Http;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using API.Models;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class ImagesController : ApiController
    {
        

        // GET: api/Images/5
        public string Get()
        {
            // Parse the connection string and return a reference to the storage account.
            var storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));

            var blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            var container = blobClient.GetContainerReference("pictures");

            var images = new List<ImageModel>();

            // Loop over items within the container and output the length and URI.
            foreach (var item in container.ListBlobs(null, false))
            {
                if (item.GetType() == typeof(CloudBlockBlob))
                {
                    var blob = (CloudBlockBlob)item;

                    //Console.WriteLine("Block blob of length {0}: {1}", blob.Properties.Length, blob.Uri);
                    images.Add(new ImageModel() { Url = blob.Uri.ToString() });

                }
            }

            return JsonConvert.SerializeObject(images);
        }
    }
}
