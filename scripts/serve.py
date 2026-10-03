"""Serve the project locally, trying the next port when one is occupied."""

import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main():
    root = Path(__file__).resolve().parent.parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))

    for port in range(8000, 8100):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), handler)
            break
        except OSError as error:
            if error.errno != errno.EADDRINUSE:
                raise
    else:
        raise SystemExit("No available port between 8000 and 8099.")

    if port != 8000:
        print(f"Port 8000 is busy; using port {port}.", flush=True)
    print(f"Open http://127.0.0.1:{port} (Ctrl+C to stop).", flush=True)

    with server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
