using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    public class UploadController : ApiController
    {
        public string Post()
        {
            //throw new System.Exception("testing...");
            var storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("pictures");

            var file = HttpContext.Current.Request.Files[0];
            var fileStream = file.InputStream;
            var fileName = file.FileName;
            var format = GetImageFormat(fileName);

            fileStream.Position = 0;
            var thumbnailStream = GetThumbnail(fileStream, format);
            thumbnailStream.Position = 0;

            var imageBlob = container.GetBlockBlobReference(fileName);
            var thumbnailBlob = container.GetBlockBlobReference("thumb_" + fileName);

            fileStream.Position = 0;
            imageBlob.UploadFromStream(fileStream);
            thumbnailBlob.UploadFromStream(thumbnailStream);

            imageBlob.Metadata["description"] = HttpContext.Current.Request.Form["description"] ?? string.Empty;
            imageBlob.Metadata["tags"] = HttpContext.Current.Request.Form["tags"] ?? string.Empty;
            imageBlob.SetMetadata();

            thumbnailBlob.Metadata["description"] = HttpContext.Current.Request.Form["description"] ?? string.Empty;
            thumbnailBlob.Metadata["tags"] = HttpContext.Current.Request.Form["tags"] ?? string.Empty;
            thumbnailBlob.SetMetadata();

            thumbnailStream.Dispose();
            fileStream.Dispose();

            return "success!";
        }

        private ImageFormat GetImageFormat(string fileName)
        {
            var extension = fileName.Substring(fileName.LastIndexOf(".") + 1);
            switch (extension.ToLower())
            {
                case "jpg":
                case "jpeg":
                    return ImageFormat.Jpeg;
                case "png":
                    return ImageFormat.Png;
                case "gif":
                    return ImageFormat.Gif;
                default:
                    return ImageFormat.Jpeg;
            }
        }

        private MemoryStream GetThumbnail(Stream stream, ImageFormat format)
        {
            var srcBmp = new Bitmap(stream);
            float w = srcBmp.Width;
            float h = srcBmp.Height;

            float ratio = w / h;
            var heightWidth = w > h ? (int)(w * 0.25) : (int)(h * 0.25);
            var newSize = new SizeF(heightWidth * ratio, heightWidth);
            var target = new Bitmap((int)newSize.Width, (int)newSize.Height);

            var memoryStream = new MemoryStream();
            using (Graphics graphics = Graphics.FromImage(target))
            {
                graphics.CompositingQuality = CompositingQuality.HighSpeed;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.DrawImage(srcBmp, 0, 0, newSize.Width, newSize.Height);
                target.Save(memoryStream, format);
            }
            return memoryStream;
        }
    }
}
