using System.Collections.Generic;
using System.Web.Http;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using API.Models;

namespace API.Controllers
{

    public class ImagesController : ApiController
    {
        public List<ImageModel> Get()
        {
            var storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("pictures");
            var images = new List<ImageModel>();

            foreach (var item in container.ListBlobs(null, false))
            {
                if (item.GetType() == typeof(CloudBlockBlob))
                {
                    var blob = (CloudBlockBlob)item;
                    blob.FetchAttributes();

                    images.Add(new ImageModel()
                    {
                        Url = blob.Uri.ToString(),
                        Description = blob.Metadata["description"],
                        Tags = blob.Metadata["tags"].Split(',')
                    });
                }
            }

            return images;
        }
    }
}
