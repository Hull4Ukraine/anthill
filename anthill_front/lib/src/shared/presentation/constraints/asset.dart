import 'package:flutter/foundation.dart';

enum Asset {
  logo('images/h4u_logo.png');

  final String _assetName;

  String get assetName {
    final path = 'assets/$_assetName';

    if (kDebugMode) {
      return path;
    }

    return 'assets/$path';
  }

  const Asset(this._assetName);
}
