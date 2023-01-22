#!/usr/bin/env python

import websockets
import argparse
import asyncio as aio
import logging
import multiprocessing
from ndn.app import NDNApp
from ndn.encoding import Name
from ndn.security import KeychainDigest
from ndn_python_repo.clients import PutfileClient, GetfileClient
import uuid

logging.basicConfig(format='[{asctime}{levelname}:{message}]',
                    datefmt='%Y-%m-%d %H:%M:%S',
                    level=logging.INFO,
                    style='{')
app = NDNApp(face=None, keychain=KeychainDigest())
async def run_putfile_client(app: NDNApp, **kwargs):
    """
    Async helper function to run the PutfileClient.
    This function is necessary because it's responsible for calling app.shutdown().
    """
    client = PutfileClient(app=app,
                           prefix=kwargs['client_prefix'],
                           repo_name=kwargs['repo_name'])
    
    # Set pubsub to register ``check_prefix`` directly, so all prefixes under ``check_prefix`` will
    # be handled with interest filters. This reduces the number of registered prefixes at NFD, when
    # inserting multiple files with one client
    check_prefix = kwargs['client_prefix']

    await client.insert_file(file_path=kwargs['file_path'],
                             name_at_repo=kwargs['name_at_repo'],
                             segment_size=kwargs['segment_size'],
                             freshness_period=kwargs['freshness_period'],
                             cpu_count=kwargs['cpu_count'],
                             forwarding_hint=kwargs['forwarding_hint'],
                             register_prefix=kwargs['register_prefix'],
                             check_prefix=check_prefix)
    # app.shutdown()

async def run_getfile_client(app: NDNApp, **kwargs):
    """
    Async helper function to run the GetfileClient.
    This function is necessary because it's responsible for calling app.shutdown().
    """
    client = GetfileClient(app, kwargs['repo_name'])
    await client.fetch_file(kwargs['name_at_repo'])
    app.shutdown()


def putfile(repo_name,
            file_path,
            name_at_repo,
            client_prefix='/putfile_client' + uuid.uuid4().hex.upper()[0:6],
            segment_size=8000,
            freshness_period=0,
            cpu_count=multiprocessing.cpu_count(),
            forwarding_hint=None,
            register_prefix=None):

    try:
        # app.run_forever(
        #     after_start=run_putfile_client(app,
        #                                    repo_name=Name.from_str(repo_name),
        #                                    file_path=file_path,
        #                                    name_at_repo=Name.from_str(name_at_repo),
        #                                    client_prefix=Name.from_str(client_prefix),
        #                                    segment_size=segment_size,
        #                                    freshness_period=freshness_period,
        #                                    cpu_count=cpu_count,
        #                                    forwarding_hint=forwarding_hint,
        #                                    register_prefix=register_prefix))\

        # aio.create_task(run_putfile_client(app,
        #                                    repo_name=Name.from_str(repo_name),
        #                                    file_path=file_path,
        #                                    name_at_repo=Name.from_str(name_at_repo),
        #                                    client_prefix=Name.from_str(client_prefix),
        #                                    segment_size=segment_size,
        #                                    freshness_period=freshness_period,
        #                                    cpu_count=cpu_count,
        #                                    forwarding_hint=forwarding_hint,
        #                                    register_prefix=register_prefix))
        aio.create_task(run_getfile_client(app,
                                           repo_name=Name.from_str(repo_name),
                                           name_at_repo=Name.from_str(name_at_repo)))
    except FileNotFoundError:
        print('Error: could not connect to NFD.')

async def echo(websocket):
    async for message in websocket:
        # with open("demofile.txt", "wb") as binary_file:
        #     binary_file.write(message)
        putfile("/testrepo", "./demofile.txt", "/test/myfile.txt")
        await websocket.send(message)

async def main():
    # async with websockets.serve(echo, "localhost", 8765):
    #     await app.main_loop()
    #     await aio.Future()  # run forever
    server = await websockets.serve(echo, "localhost", 8765)
    await server.start_serving()
    await app.main_loop()
    await aio.Future()  # run forever

aio.run(main())