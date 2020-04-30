import tornado.ioloop
import tornado.web
import sys
import asyncio
from get_info import get_cpu_info

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Content-type", "application/json")
        cpu_info = get_cpu_info()
        self.write(cpu_info)

class Server():

    def __init__(self, port):
        if sys.platform == 'win32':
            asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        self.handlers = [
            (r"/", MainHandler),
        ]
        self.app = tornado.web.Application(self.handlers)
        self.port = port

    def start(self):
        self.app.listen(self.port)
        tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    server = Server(5000)
    server.start()