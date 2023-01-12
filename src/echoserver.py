#!/usr/bin/env python

import asyncio
import websockets

async def echo(websocket):
    async for message in websocket:
        with open("demofile.txt", "wb") as binary_file:
            binary_file.write(message)
        await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())