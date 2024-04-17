enum Asset {
  logo('images/h4u_logo.png');

  final String _assetName;

  String get assetName => 'assets/$_assetName';

  const Asset(this._assetName);
}
