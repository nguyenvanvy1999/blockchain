import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebSocketGatewayInit } from '../utils/init';

@WebSocketGatewayInit()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  afterInit(): void {
    this.logger.log('Websocket init success');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Connected ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected ${client.id}`);
  }
}
