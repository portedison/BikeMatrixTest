# Use the official .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy project files
COPY . ./

# Set environment variable
ENV DOTNET_USE_POLLING_FILE_WATCHER=true

# Expose the API port
EXPOSE 80

# Start the app in watch mode
CMD ["dotnet", "watch", "run"]
