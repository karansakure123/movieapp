  
#!/bin/bash  
# Railway start script for MovieApp Backend  
  
echo "?? Starting MovieApp Backend..."  
  
# Generate Prisma client if needed  
if [ ! -d "node_modules/.prisma" ]; then  
  echo "?? Generating Prisma client..."  
  npm run prisma:generate  
fi  
  
# Start the application  
echo "?? Starting server..."  
npm start 
