import SimpleHTTPServer
import SocketServer

print
print "Webserver er startet for http://localhost:8000"
print


Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
server = SocketServer.TCPServer(('127.0.0.1', 8000), Handler)

server.serve_forever()