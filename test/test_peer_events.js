var assert = require('assert');
var http = require('http');
var WebSocket = require('ws');
var zettatest = require('./fixture/zetta_test');
var Scout = require('./fixture/example_scout');

describe('Peer Connection Events in Pubsub', function() {
  var cluster = null;
  var device = null;
  beforeEach(function(done) {
    cluster = zettatest()
      .server('cloud')
      .server('detroit1', [Scout], ['cloud']);
    done();
  });

  afterEach(function(done) {
    cluster.stop();
    setTimeout(done, 10); // fix issues with server not being closed before a new one starts
  });

  describe('Initiator Events', function() {
    it('should recieve a _peer/connect event', function(done) {
      
      var recv = 0;
      cluster.servers['detroit1'].pubsub.subscribe('_peer/connect',function() {
        recv++;
      });

      cluster.run(function(err) {
        if (err) {
          return done(err);
        }
        assert.equal(recv, 1);
        done();
      });
    });
  });

  describe('Acceptor Events', function() {
    it('should recieve a _peer/connect event', function(done) {
      
      var recv = 0;
      cluster.servers['cloud'].pubsub.subscribe('_peer/connect',function() {
        recv++;
      });

      cluster.run(function(err) {
        if (err) {
          return done(err);
        }
        assert.equal(recv, 1);
        done();
      });
    });    
  });
});
